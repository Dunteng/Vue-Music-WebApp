import originJsonp from 'jsonp'
/* jsonp2这个函数的三个参数，url是一个干净的不带参数的url地址，data表示随同url传过去的参数，
  因为jsonp这个插件要求的url是不支持object类型的的data参数的，所以我们需要先将data里面的数据拼接到url上。
  第三个参数option对应jsonp插件api里的opts参数
*/
export default function jsonp2(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

    return new Promise((resolve, reject) => {
        originJsonp(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

export function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''   /* 避免遇到空数据然后把undefined拼进去了 */
        url += '&' + k + '=' + encodeURIComponent(value)/* encodeURIComponent(value)进行字符转义，如encodeURIComponent('百度')转为"%E7%99%BE%E5%BA%A6" */
    }
    return url ? url.substring(1) : ''
}