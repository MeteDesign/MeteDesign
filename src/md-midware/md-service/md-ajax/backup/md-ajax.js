(function (f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f()
  } else if (typeof define === 'function' && define.amd) {
    define('md_ajax2', [], f)
  } else {
    var g
    if (typeof window !== 'undefined') {
      g = window
    } else if (typeof global !== 'undefined') {
      g = global
    } else if (typeof self !== 'undefined') {
      g = self
    } else {
      g = this
    }
    g.md_ajax = f()
  }
})(function () {
  function Ajax (options) {
    if (!(this instanceof Ajax)) {
      return new Ajax(options)
    }
    this.url = options.url || ''// 请求的链接
    this.type = (options.type || 'get').toLowerCase()// 请求的方法,默认为get
    this.data = options.data || null// 请求的数据
    this.contentType = options.contentType || ''// 请求头
    this.dataType = options.dataType || ''// 请求的类型
    this.async = options.async === undefined ? true : options.async// 是否异步，默认为true.
    this.timeOut = options.timeOut // 超时时间。
    this.before = options.before || function () { }// 发送之前执行的函数
    this.error = options.error || function () { }// 错误执行的函数
    this.success = options.success || function () { } // 请求成功的回调函数
    this.timeout_bool = false// 是否请求超时
    this.timeout_flag = null// 超时标识
    this.xhr = null // xhr对角
    this.successData = null
    this.isCache = options.isCache || false
    this.cacheCal = options.cacheCal || function () { }// 缓存回调函数
    this.url += this.setData(this.data, this.type, this.dataType)
  }
  Ajax.prototype = {
    start: function () {
      this.before()
      if (this.dataType === 'jsonp') {
        this.createJsonp()
      } else {
        this.createXHR()
      }
    },
    encodeData: function (name, value, parentName) {
      var items = []
      name = parentName === undefined ? name : parentName + '[' + name + ']'
      if (typeof value === 'object' && value !== null) {
        items = items.concat(this.setObjData(value, name))
      } else {
        name = encodeURIComponent(name)
        value = encodeURIComponent(value)
        items.push(name + '=' + value)
      }
      return items
    },
    setObjData: function (data, parentName) {
      var arr = [], value
      if (Object.prototype.toString.call(data) == '[object Array]') {
        for (var i = 0, len = data.length; i < len; i++) {
          value = data[i]
          arr = arr.concat(this.encodeData(typeof value === 'object' ? i : '', value, parentName))
        }
      } else if (Object.prototype.toString.call(data) == '[object Object]') {
        for (var key in data) {
          value = data[key]
          arr = arr.concat(this.encodeData(key, value, parentName))
        }
      }
      return arr
    },
    setStrData: function (data) {
      var arr = data.split('&')
      for (var i = 0, len = arr.length; i < len; i++) {
        name = encodeURIComponent(arr[i].split('=')[0])
        value = encodeURIComponent(arr[i].split('=')[1])
        arr[i] = name + '=' + value
      }
      return arr
    },
        // JSONP
    createJsonp: function () {
      var script = document.createElement('script'),
        timeName = new Date().getTime() + Math.round(Math.random() * 1000),
        callback = 'JSONP_' + timeName

      window[callback] = function (data) {
        clearTimeout(this.timeout_flag)
        document.body.removeChild(script)
        success(data)
      }
      script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + callback
      script.type = 'text/javascript'
      document.body.appendChild(script)
      this.setTime(callback, script)
    },
        // 设置请求超时
    setTime: function (callback, script) {
      if (this.timeOut !== undefined) {
        this.timeout_flag = this.setTimeout(function () {
          if (dataType === 'jsonp') {
            delete window[callback]
            document.body.removeChild(script)
          } else {
            this.timeout_bool = true
            this.xhr && this.xhr.abort()
          }
          console.log('timeout')
        }, this.timeOut)
      }
    },
    getXHR: function () {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest()
      } else {
                // 遍历IE中不同版本的ActiveX对象
        var versions = ['Microsoft', 'msxm3', 'msxml2', 'msxml1']
        for (var i = 0; i < versions.length; i++) {
          try {
            var version = versions[i] + '.XMLHTTP'
            return new ActiveXObject(version)
          } catch (e) { }
        }
      }
    },
    createXHR: function () {
            // 由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。

            // 创建对象。
      this.xhr = this.getXHR()
      this.xhr.open(this.type, this.url, this.async)
            // 设置请求头
      if (this.type === 'post' && !this.contentType) {
                // 若是post提交，则设置content-Type 为application/x-www-four-urlencoded
        this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
      } else if (this.contentType) {
        this.xhr.setRequestHeader('Content-Type', this.contentType)
      }
            // 添加监听
      this.xhr.onreadystatechange = function () {
        if (this.xhr.readyState === 4) {
          if (this.timeOut !== undefined) {
                        // 由于执行abort()方法后，有可能触发onreadystatechange事件，
                        // 所以设置一个timeout_bool标识，来忽略中止触发的事件。
            if (this.timeout_bool) {
              return
            }
            clearTimeout(this.timeout_flag)
          }
          if ((this.xhr.status >= 200 && this.xhr.status < 300) || this.xhr.status == 304) {
            this.success(this.xhr.responseText)
            if (this.isCache) {
              this.successData = this.xhr.responseText
              this.cacheCal(this.xhr.responseText)
            }
          } else {
            this.error(this.xhr.status, this.xhr.statusText)
          }
        }
      }.bind(this)
            // 发送请求
      this.xhr.send(this.type === 'get' ? null : this.data)
      this.setTime() // 请求超时
    },
    setData: function (data, type, dataType) {
      var url = ''
            // 设置字符串的遍码，字符串的格式为：a=1&b=2;
      if (data) {
        if (typeof data === 'string') {
          data = this.setStrData(data)
        } else if (typeof data === 'object') {
          data = this.setObjData(data)
        }
        data = data.join('&').replace('/%20/g', '+')
                // 若是使用get方法或JSONP，则手动添加到URL中
        if (type === 'get' || dataType === 'jsonp') {
          url += url.indexOf('?') > -1 ? (url.indexOf('=') > -1 ? '&' + data : data) : '?' + data
        }
      }
      return url
    }
  }
  return Ajax
})

