const loadAllProducts = async() =>{
    const url =`https://fakestoreapi.com/products`
    const res = await fetch(url)
    const data = await res.json()
    return data;
}
const setAllMenu = async()=>{
    const data  = await loadAllProducts();
    const menu = document.getElementById('all-menu')

    uniqueArray = [];

    for(const product of data){
        if(uniqueArray.indexOf(product.category) === -1){
            uniqueArray.push(product.category)
            const li = document.createElement('li')
            li.innerHTML =`
            <a>${product.category}</a>
            `
            menu.appendChild(li);
        }
       
        
    }
}

const search = document.getElementById('search-field')
search.addEventListener('keypress', async(event)=>{
    if(event.key === 'Enter'){
        // console.log(search.value);
        const searchValue = search.value;
        const allProducts = await loadAllProducts()
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));

        // console.log(foundProducts);
        const productsContainer = document.getElementById('products-container')
        productsContainer.innerText = '';
        const notFound = document.getElementById('not-found');
        notFound.textContent = '';

        if(foundProducts.length === 0){
            notFound.innerHTML =`<h2 class ="text-2xl text-orange-500 text-center">not found</h2>`

        }

        foundProducts.forEach(product=>{
            const {category, image, title, description} = product
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src=${image} alt="Shoes" class="h-60 w-full"  /></figure>
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
              <p>${title.length > 20 ?title.slice(0, 20)+ '...' : title}</p>
              <div class="card-actions justify-end">
               <label for="my-modal-3" onclick="modalBody('${description}','${image}')" class="btn btn-primary modal-button">Show Details</label>
              </div>
            </div>
          </div>    
        `
        productsContainer.appendChild(div)
    
        })
    }  
})
const modalBody = (description, image) =>{
    const modal = document.getElementById('modal-body')
    modal.innerHTML = `
    <p class="py-4">${description}</p>
    <img src="${image}"/>
    `

}
setAllMenu()