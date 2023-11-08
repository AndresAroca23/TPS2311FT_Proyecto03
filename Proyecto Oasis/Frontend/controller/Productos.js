let idProductSelected = 0;
let priceProductSelected = 0;
let discountProductSelected = 0;
let valueTotalPrice = 0;
let cantidad = 0;


const nf = new Intl.NumberFormat("es-MX");

(()=>{
    let url = "http://127.0.0.1:3000/products"

    fetch(`${url}`)
    .then((response)=> response.json())
    .then ((data)=> {
        if(data != undefined && data.length > 0){
            let products = ``;
            let descuentos = ``; 

            for (let product = 0; product < data.length; product++) {

                let conversionDescuento = data[product].Descuentos/100;
                let valueDescuento = data[product].precio_id*conversionDescuento;

                if(data[product].Descuentos != null && data[product].Descuentos != 0){
                    descuentos  = `<span class="badge badge-danger">Descuento ${data[product].Descuentos} %</span>
                    <span class="badge badge-warning" style="text-decoration: line-through;">$ ${nf.format(data[product].precio_id)}</span>
                    <span class="badge badge-success">$ ${nf.format(data[product].precio_id - valueDescuento)}</span>`;
                }else{
                    descuentos = `
                    <span class="badge badge-success">$ ${nf.format(data[product].precio_id)}</span>
                    `
                }
                
                products += `
                <div class="col-md-4 mb-4">
                <div class="card" style="width: 18rem;">
                  <img src="../Imagenes/muestra_de_tamal_familiar.jpg" class="card-img-top" alt="Tamal1">
                  <div class="card-body">
                    <h5 class="card-title">${data[product].names_id}</h5>
                    <p class="card-text" style="max-height: 60px; overflow-y: scroll;">${data[product].DESCRIPTION == null ? "" : data[product].DESCRIPTION}</p>
                    <div class="Badges mb-2" style="text-align:center;">
                      ${descuentos} 
                    </div>
                    <button data-toggle="modal" onclick="productSelected(${data[product].id}, ${data[product].precio_id}, ${data[product].Descuentos})" style="width:100%" data-target="#staticBackdrop" type="button" class="btn btn-success btn-lg">Comprar</button>
                  </div>
                </div>
              </div>
                `; 
            }
           document.querySelector("#rowProducts").innerHTML = products; 
        }
    })
})();


const productSelected = function(id, price, discount){
    idProductSelected = id;
    priceProductSelected = price;
    discountProductSelected = discount;
}

const CalculatedTotalPrice = function(event){
    
    let conversionDescuento = discountProductSelected/100;
    let valueDescuento = priceProductSelected*conversionDescuento;

    if (event.target.value != "" && event.target.value != undefined ) {
        cantidad = parseInt(event.target.value);
    }

    if(discountProductSelected != null && discountProductSelected != 0){
        let valueDescuentoTotal = priceProductSelected - valueDescuento;
        valueTotalPrice = valueDescuentoTotal * cantidad;
    }else{
        valueTotalPrice = priceProductSelected *  cantidad;
    }
    document.querySelector("#totalPriceProduct").value = `$ ${nf.format(valueTotalPrice)} ` ;
}

const BuyProductSelected = async function(){

    let data = {
        name: document.getElementById("nombre_id").value, 
        direccion: document.getElementById("telefono_id").value, 
        telefono: document.getElementById("direccion_id").value, 
        cantidad: cantidad, 
        products_id: idProductSelected, 
        fecha_compra: Date.now(), 
        total_compra: valueTotalPrice
    }
    await fetch(`http://127.0.0.1:3000/pedido`,{
        method:"POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response)=> response.json())
    .then((data)=> {
        document.getElementById("nombre_id").value = "";
        document.getElementById("telefono_id").value = "";
        document.getElementById("direccion_id").value = ""; 
        document.getElementById("cantidad_id").value = ""; 
        document.getElementById("totalPriceProduct").value = ""; 
        alert(data.message);
    });
}


