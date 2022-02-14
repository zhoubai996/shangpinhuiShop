// 设置本地token
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}
// 清楚本地token
export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}