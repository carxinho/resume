!function () {
  findClosestAndRemoveOffset()

  window.addEventListener('scroll', function () {
    findClosestAndRemoveOffset()
  })

  function findClosestAndRemoveOffset() {
    let specialTags = document.querySelectorAll('[data-x]')
    for (let i = 0; i < specialTags.length; i++) {
      specialTags[i].classList.add('offset')
    }
    let minIndex = 0
    for (let i = 1; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i
      }
    }

    specialTags[minIndex].classList.remove('offset')

    let id = specialTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let brothersAndMe = li.parentNode.children
    for (let i = 0; i < brothersAndMe.length; i++) {
      brothersAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
  }
  let liTags = document.getElementsByClassName('menuTigger')
  for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
      x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (x) {
      x.currentTarget.classList.remove('active')
    }
  }
}.call()