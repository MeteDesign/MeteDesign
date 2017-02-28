import axios from 'axios';
import Promise from 'es6-promise';
import md_sessionStorage from '../md-sessionStorage'
import md_localStorage from '../md-localStorage'

Promise.polyfill();

const serializeRequest = (url, data) => url + serializeData(data);
const serializeData = (data) => JSON.stringify(data)
const storage = (type) => {
    switch (type){
        case 'session':
            return md_sessionStorage
        case 'local':
            return md_localStorage
        default:
            return md_sessionStorage
    }
}
const request = (method, url, data, config = {}) => {
    let options = Object.assign({}, config, {
        url,
        method,
        data
        // baseURL: window.AppConf.apiHost
    });
    options.headers = options.headers || {};
    return new Promise((resolve, reject) => {
        if (options.cache) {
            let key = serializeRequest(options.url, options.data)

            if (storage(options.cacheType).get(key)) {
                resolve(storage(options.cacheType).get(key))
            } else {
                axios.request(options)
                    .then(res => {
                        let data = res.data; // response datq
                        if (data.HasError) {
                            reject(res);
                        }
                        storage(options.cacheType).set(key, data)
                        resolve(data);
                    }).catch(res => {
                    reject(res);
                });
            }
        } else {
            axios.request(options)
                .then(res => {
                    let data = res.data; // response datq
                    if (!data) {
                        return resolve(data);
                    }
                    if (data.HasError) {
                        reject(res);
                    }
                    resolve(data);
                }).catch(res => {
                reject(res);
            });
        }

    });
};

 const md_ajax = {
    get(url, config) {
        return request('get', url, null, config);
    },
    delete(url, config) {
        return request('delete', url, null, config);
    },
    head(url, config) {
        return request('head', url, null, config);
    },
    post(url, data, config) {
        return request('post', url, data, config);
    },
    put(url, data, config) {
        return request('put', url, data, config);
    },
    patch(url, data, config) {
        return request('path', url, data, config);
    },
    setCommonHeader(key, value) {
        window.axios.defaults.headers.common[key] = value;
    }
};
export default md_ajax