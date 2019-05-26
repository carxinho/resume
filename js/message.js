!function () {
    let model = Model({resourceName:'Message'})
    let view = View('section.message')
    let controller = Controller({
        init: function (view, model) {
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.model.initAV()
            this.loadMessages()
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
            this.model.save({'name':name, 'content':content})
            .then(function (objects) {
                // 成功保存之后，帮用户刷新页面
                let li = document.createElement('li')
                li.innerText = `${objects.attributes.name}:${objects.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name = content]').value = ''
            })
        }
    })
    
    // {
    //     view: null,
    //     model: null,
    //     messageList: null,
    //     form: null,
    //     init: function (view, model) {
    //         this.view = view
    //         this.model = model
    //         this.messageList = view.querySelector('#messageList')
    //         this.form = view.querySelector('#postMessageForm')
    //         this.model.initAV()
    //         this.loadMessages()
    //         this.bindEvents()
    //     },
        
    // }




    controller.init(view, model)
}.call()