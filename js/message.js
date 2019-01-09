!function () {
    var model = {
        initAV: function () {
            var APP_ID = 'fBaLVycKWYBN6z14CuECydXT-gzGzoHsz';
            var APP_KEY = 'vhia8qPM2LvT1ERPV5xx5KmQ';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        //获取数据
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find()  //Promise对象
        },
        //创建数据
        save: function (name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({  //Promise对象
                'name': name,
                'content': content
            })
        }
    }
    var view = document.querySelector('section.message')
    var controller = {
        view: null,
        model: null,
        messageList: null,
        form: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.model.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then((message) => {
                // 成功获得实例
                let array = message.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}:${item.content}`
                    this.messageList.appendChild(li)
                })
            });
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let name = myForm.querySelector('input[name = name]').value
            let content = myForm.querySelector('input[name = content]').value
            this.model.save(name, content).then(function (objects) {
                // 成功保存之后，帮用户刷新页面
                let li = document.createElement('li')
                li.innerText = `${objects.attributes.name}:${objects.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name = content]').value = ''
            });
        }
    }




    controller.init(view, model)
}.call()