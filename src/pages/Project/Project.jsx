import { Button, Popover } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import React, { useState, useEffect } from 'react'

import '../../asset/iconCss/iconCss.css'
// import BraftEditor from 'braft-editor';
// import 'braft-editor/dist/index.css';
import '../less/all.less'
import axios from 'axios'

export default function Project() {
  const navigate = useNavigate()
  // 设定menu的items
  const [items, setItems] = useState([])
  const introduce = '<center><font size=5>项目介绍</font></center><font size=4>&ensp;&ensp;这里主要介绍我做过的一下项目会讲的尽可能详细些，一来可以帮助自己学习和总结，二来如果有需要的朋友可以来看看。这些项目会慢慢更新上，目前这个栏目还在测试阶段，所以会有很多测试数据，请见谅。</font>\r\n\r\n'
  const [content, setContent] = useState(introduce)
  // const [editorState, setEditorState] = useState(introduce)

  // 返回对象
  function getItem(label, key, icon, children) {
    return {
      label,
      key,
      icon,
      children,
    };
  }
  // 返回数组。menu下的小标题
  function getItem2(articles) {
    if (!articles) return []
    var arr = []
    for (var i = 0; i < articles.length; i++) {
      arr.push(
        getItem(articles[i].name, `${articles[i]._id}`, null, null)
      )
    }
    return arr;
  }
  // 获取文章目录
  const getAllArticle = async () => {
    let allArticleTypes = []
    await axios.get('/api/article')
      .then(res => {
        allArticleTypes = res.data
        // console.log(this.content)
      })
    const hardwareArticle = allArticleTypes.filter((article) => {
      return article.projectType === 'hardware'
    })
    const softwareArticle = allArticleTypes.filter((article) => {
      return article.projectType === 'software'
    })
    const cvArticle = allArticleTypes.filter((article) => {
      return article.projectType === 'cv'
    })
    const gitArticle = allArticleTypes.filter((article) => {
      return article.projectType === 'git'
    })
    const otherArticle = allArticleTypes.filter((article) => {
      return article.projectType === 'other'
    })
    // all = [...hardwareArticle, ...softwareArticle, ...cvArticle, ...gitArticle, ...otherArticle]
    // console.log(hardwareArticle)
    setItems([
      getItem('项目分享介绍', 'shareProject', <i className="iconfont">&#xe628;</i>, null, introduce),
      getItem('软件项目', 'software', <i className="iconfont">&#xec2e;</i>, getItem2(softwareArticle)),
      getItem('硬件项目', 'hardware', <i className="iconfont">&#xe60c;</i>, getItem2(hardwareArticle)),
      getItem('cv类项目', 'cv', <i className="iconfont">&#xe64d;</i>, getItem2(cvArticle)),
      getItem('git', 'git', <i className="iconfont">&#xe885;</i>, getItem2(gitArticle)),
      getItem('其他项目', 'other', <i className="iconfont">&#xe662;</i>, getItem2(otherArticle))
    ])
  }
  useEffect(() => {
    getAllArticle()
    // console.log(items);
  }, [])//eslint-disable-line
  // 点击请求文章
  const onClick = (e) => {
    // e.keyPath[0]是文章的key
    // e.keyPath[1]是文章所属分类
    // let articleContent = ''
    // console.log('click ', e);
    // setContent(getContent(e.key))
    getContent(e.key).then((result) => {
      // articleContent = result
      setContent(result)
      navigate('/Project/' + e.key)
      // console.log(result);

    })
    // console.log('neirong ', articleContent);
    // setContent(articleContent)
  };
  // 获取文章内容
  async function getContent(id) {
    if (id === 'shareProject') return introduce
    let allArticles = []
    let articleContent = ''
    await axios.get('/api/article')
      .then(res => {
        allArticles = res.data
      })
    // console.log(allArticles);

    articleContent = allArticles.filter((article) => {
      return article._id === id
    })[0].content
    // console.log(typeof articleContent);
    return articleContent
  }
  // 改富文本内容
  // function changeEditer(edit) {
  //   setEditorState(edit)
  // }
  const know = '分享些做过的项目，也算是对自己学到的东西进行总结。偶尔更新~'
  return (
    <div className='all project'>
      <div className='title0'>
        <div className='title1'>项目介绍</div>
        <Popover content={know} title="Title" trigger="click">
          <Button className='commentNote'>观看悉知</Button>
        </Popover>
        <Link to={'/Home'} className='backToHome'><Button>返回</Button></Link>
      </div>
      <div className='art'>
        <div className='menu'>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
              borderRadius: 5
            }}
            defaultSelectedKeys={['shareProject']}
            defaultOpenKeys={['shareProject']}
            mode="inline"
            items={items}
          >
          </Menu>
        </div>
        <div className='content' dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}
