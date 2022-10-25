<script>
    function LoadCategories(){
        fetch("http://fakestoreapi.com/products/categories")
        .then(function(res){
            return res.json();
        })
        .then(function(categories){
            for(var category of categories){
                var option=document.createElement("option");
                option.text=category;
                option.value=category;
                document.getElementById("lstCategories").appendChild(option);
        })
    }
    function bodyload(){
        LoadCategories();

    }
</script>