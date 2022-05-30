const body = document.querySelector('body')
const btnMenu = document.querySelector('#btn-menu')
const cart = document.getElementById('cart')
const cartContent = document.getElementById('cart-content')
const form = document.getElementById('shop-form')
const menu = document.getElementById('menu')
const modal = document.getElementById('modal')
const sliderImages = document.getElementById('slider-images')
const sliderThumbnails = document.getElementById('slider-thumbnails')

let items = 0

class UI {
    constructor(){
        this.imageNum = 0
        this.images = ['images/image-product-1.jpg', 'images/image-product-2.jpg', 'images/image-product-3.jpg', 'images/image-product-4.jpg']
    }

    setupAPP() {

        this.populateVisor()
        this.populateCart()

        document.addEventListener('click', e => {

            // click btn menú
            if(e.target.matches('#btn-menu')) {
                this.toggleMenu()
            }

            // clic btn cart
            if(e.target.matches('#btn-cart')) {
                this.toggleCart()
            }

            // clic btn slider
            if(e.target.matches('.slider-buttons button')) {
                if (e.target.matches('#btn-next')) {
                    if (this.imageNum === 3) {
                        this.imageNum = 0
                    } else {
                        this.imageNum ++
                    }
                } else if (e.target.matches('#btn-prev')) {
                    if (this.imageNum === 0) {
                        this.imageNum = 3
                    } else {
                        this.imageNum --
                    }
                }
                this.changeImage()
            }

            // clic thumbnail
            if(e.target.matches('#slider-thumbnails img')) {
                this.imageNum = parseInt(e.target.dataset.id)
                this.changeImage()
            }

            // clic + y -
            if(e.target.matches('.number input[type="button"]')){
                this.howMany(e.target.id)
            }

            // clic add to cart
            if(e.target.matches('#btn-add')){
                e.preventDefault()
                this.handleAdd()
            }

            // clic delete cart
            if(e.target.matches('#btn-delete')){
                items = 0
                this.populateCart()
            }
        })

        // cierra automáticamente el menú cuando agrandamos mucho la pantalla
        window.addEventListener('resize', e => {
            if(e.target.innerWidth >= 720 && menu.classList.contains('showMenu')){
                this.toggleMenu()
            }
        })
    }

    changeImage() {
        sliderImages.style.right = `${this.imageNum * 100}%`
        const thumbnails = [...document.querySelectorAll('#slider-thumbnails div')]
        thumbnails.forEach(div => {
            if (thumbnails[this.imageNum] === div) {
                div.classList.add('active')
            } else {
                div.classList.remove('active')
            }
        })
    }

    handleAdd() {
        if(form.cantidad.value > 0) {
            items += parseInt(form.cantidad.value)
            this.populateCart()
            this.toggleCart(true)
            form.reset()
        }
    }

    howMany(id) {
        if(id === 'btn-plus') {
            form.cantidad.value ++
        } else if(id === 'btn-minus') {
            if (form.cantidad.value == 0) return false
            form.cantidad.value --
        }
        if(form.cantidad.value == 0) {
            form.cantidad.style.visibility = 'hidden'
        } else {
            form.cantidad.style.visibility = 'visible'
        }

    }

    populateCart() {
        if(items === 0){
            cartContent.innerHTML = '<p>Your cart is empty</p>'
            document.querySelector('#btn-cart div').textContent = ''
        } else {
            document.querySelector('#btn-cart div').textContent = items
            cartContent.innerHTML = `
            <div>
                <div><img src="./images/image-product-1-thumbnail.jpg" alt=""></div>
                <div>
                    <div>Fall Limited Edition Sneakers</div>
                    <div>$125 x ${items} <span>$${items * 125}</span></div>
                </div>
                <button id='btn-delete'><img src="./images/icon-delete.svg"></button>
            </div>
            <button>Checkout</button>
            `
        }
    }
    
    populateVisor() {
        // no usé fragment para evitar tener que crear dos (uno para el slider y otro para las miniaturas)
        let fragmentTemplate = ``
        this.images.forEach(image => {
            fragmentTemplate += `<div><img src=${image} data-id=${this.images.indexOf(image)}></div>`
        })
        sliderImages.innerHTML = fragmentTemplate
        sliderThumbnails.innerHTML = fragmentTemplate
        sliderImages.style.width = this.images.length * 100 + "%"
        document.querySelector('#slider-thumbnails div').classList.add('active')
    }

    toggleCart(keepOpen) {
        if(keepOpen){
            cart.classList.add('showCart')
        }else{
            cart.classList.toggle('showCart')
        }
    }

    toggleMenu() {
        menu.classList.toggle('showMenu')
        modal.classList.toggle('showModal')

        if (menu.classList.contains('showMenu')) {
            btnMenu.firstElementChild.src = './images/icon-close.svg'
            body.classList.add('noScroll')
        } else {
            btnMenu.firstElementChild.src = './images/icon-menu.svg'
            body.classList.remove('noScroll')
        }
    }

}

document.addEventListener('DOMContentLoaded', e => {
    const ui = new UI()
    
    // setup APP
    ui.setupAPP()

})