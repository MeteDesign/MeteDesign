import {md_ajax} from '../index.js'

(function () {
    md_ajax.get('./data.json',{cache:true}).then((data) => {
        document.getElementById('rst').innerHTML= data.data
    }).catch((msg) => {
        document.getElementById('rst').innerHTML= msg
    })
})()

