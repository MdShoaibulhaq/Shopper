
            function LoadCategories(){
                fetch("http://fakestoreapi.com/products/categories")
                .then(function(res){
                    return res.json();
                })
                .then(function(categories){
                    categories.unshift("all");
                    for(var category of categories){
                        var option = document.createElement("option");
                        option.text = category.toUpperCase();
                        option.value = category;
                        document.getElementById("lstCategories").appendChild(option);
                    }
                })
            }
    
            function LoadProducts(url){
                document.querySelector("main").innerHTML = "";
                fetch(url)
                .then(function(res){
                    return res.json();
                })
                .then(function(products){
                     for(var product of products){
                         var div = document.createElement("div");
                         div.className = "card m-2 p-2";
                         div.style.width = "200px";
                         div.innerHTML = `
                           <img src=${product.image} height="130" class="card-img-top">
                           <div class="card-header" style="height:140px">
                             <p>${product.title}</p>
                           </div>
                           <div class="card-body">
                               <dl>
                                 <dt>Price</dt>
                                 <dd>${product.price}</dd>
                                 <dt>Rating</dt>
                                 <dd> <span class="bi bi-star-fill text-success"></span> ${product.rating.rate} [${product.rating.count}]</dd>
                               </dl>
                           </div>
                           <div class="card-footer">
                                <button  onclick="AddClick(${product.id})" class="btn btn-danger w-100"> <span class="bi bi-cart2"></span> Add to Cart</button>
                           </div>
                         `;
                         document.querySelector("main").appendChild(div);
                     }
                })
            }
    
    
            function bodyload(){
                LoadCategories();
                LoadProducts("http://fakestoreapi.com/produ");
                GetItemsCount();
            }
            function CategoryChanged(){
                var categoryName = document.getElementById("lstCategories").value;
                if(categoryName=="all"){
                    LoadProducts(`http://fakestoreapi.com/products`);
                } else {
                    LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
                }
            }
            var cartItems = [];
            function GetItemsCount(){
                document.getElementById("lblCount").innerHTML = cartItems.length;
            }
            function AddClick(id){
                fetch(`http://fakestoreapi.com/products/${id}`)
                .then(function(res){
                    return res.json();
                })
                .then(function(product){
                    cartItems.push(product);
                    alert(`${product.title}\nAdded To Cart`);
                    GetItemsCount();
                })
            }
            function ShowCartItems(){
                document.querySelector("tbody").innerHTML = "";
                for(var item of cartItems){
                    var tr = document.createElement("tr");
                    var tdTitle = document.createElement("td");
                    var tdPrice = document.createElement("td");
                    var tdPhoto = document.createElement("td");
    
                    tdTitle.innerHTML = item.title;
                    tdPrice.innerHTML = item.price;
                    tdPhoto.innerHTML = `<img src=${item.image} width="50" height="50">`;
    
                    tr.appendChild(tdTitle);
                    tr.appendChild(tdPrice);
                    tr.appendChild(tdPhoto);
    
                    document.querySelector("tbody").appendChild(tr);
                }
            }