class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId;
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);

        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);

        return rootElement;
    }

    render() {
        throw new Error("Implement me!");
    }
}

class Product extends Component {

    constructor(renderHookId, title, image, desc, price) {
        super(renderHookId);
        this.title = title;
        this.imageUrl = image;
        this.desc = desc;
        this.price = price;
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item');
        prodEl.innerHTML = `
            <div>
                <img src="${this.imageUrl}" alt="${this.title}">
                <div class="product-item__content">
                    <h2>${this.title}</h2>
                    <h3>${this.price}</h3>
                    <p>${this.desc}</p>
                    <button>Add to cart</button>
                </div>
            </div>
        `

        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this))
    }

    addToCart() {
        Shop.addProductToCart(this);
    }
}

class ProductList extends Component{
    static id = 'prod-list';
    attributes = [
        new ElementAttribute('id', 'prod-list'),
    ]

    constructor(renderHookId) {
        super(renderHookId);
        this.productsList = [];
    }

    appendProduct(product) {
        this.productsList.push(product);
    }

    render() {
        const prodList = this.createRootElement('ul', 'product-list', this.attributes);

        for (const prod of this.productsList) {
            prod.render();
        }
    }
}

class ShoppingCart extends Component {
    items = [];

    constructor(renderHookId) {
        super(renderHookId);
    }

    set cartItems(newItems) {
        this.items = newItems;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`
    }

    get totalAmount() {
        return this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0);
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    orderProducts() {
        console.log('Ordering...');
        console.log(this.items);
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart');

        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order now!</button>
        `;

        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', () => this.orderProducts());

        this.totalOutput = cartEl.querySelector('h2');
    }
}

class Shop {
    static cart = new ShoppingCart('app');
    static productList = new ProductList('app');

    static render() {
        this.cart.render();
        this.productList.render();
    }

    static addProductToProductList(product) {
        this.productList.appendProduct(product);
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }

}


const product1 = new Product(ProductList.id, 'title1', 'img1', 'description', 50);
const product2 = new Product(ProductList.id, 'title2', 'img2', 'description2', 70);

Shop.addProductToProductList(product1);
Shop.addProductToProductList(product2);

Shop.render();