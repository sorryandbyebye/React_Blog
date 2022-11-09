import reducer from "./reducer";
import { legacy_createStore as createStore } from "redux"
const store = createStore(reducer)
export default store
