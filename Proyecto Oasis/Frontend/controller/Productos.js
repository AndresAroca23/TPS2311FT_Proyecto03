let idProductSelected = 0;
let priceProductSelected = 0;
let discountProductSelected = 0;
let valueTotalPrice = 0;
let cantidad = 0;
let url = "https://tps2311ft-proyecto03.onrender.com";


const nf = new Intl.NumberFormat("es-MX");

(async ()=>{
    let url = "https://tps2311ft-proyecto03.onrender.com";

    await fetch(`${url}/products`)
    .then((response)=> response.json())
    .then ((data)=> {
        console.log(data);
        if(data != undefined && data.data.length > 0){
            let products = ``;
            let descuentos = ``; 

            for (let product = 0; product < data.data.length; product++) {

                let conversionDescuento = data.data[product].Descuentos/100;
                let valueDescuento = data.data[product].precio_id*conversionDescuento;

                if(data.data[product].Descuentos != null && data.data[product].Descuentos != 0){
                    descuentos  = `<span class="badge badge-danger">Descuento ${data.data[product].Descuentos} %</span>
                    <span class="badge badge-warning" style="text-decoration: line-through;">$ ${nf.format(data.data[product].precio_id)}</span>
                    <span class="badge badge-success">$ ${nf.format(data.data[product].precio_id - valueDescuento)}</span>`;
                }else{
                    descuentos = `
                    <span class="badge badge-success">$ ${nf.format(data.data[product].precio_id)}</span>
                    `
                }
                let imagenBase64 = "";
                if (data.data[product].imagen) {
                    imagenBase64 = `data:image/png;base64,${data.data[product].base64}`
                }

                products += `
                <div class="col-md-4 mb-4">
                <div class="card" style="width: 18rem;">
                  <img src="${imagenBase64}" style="max-height: 150px;" class="card-img-top" alt="Image">
                  <div class="card-body">
                    <h5 class="card-title">${data.data[product].names_id}</h5>
                    <p class="card-text" style="max-height: 60px; overflow-y: scroll;">${data.data[product].DESCRIPTION == null ? "" : data.data[product].DESCRIPTION}</p>
                    <div class="Badges mb-2" style="text-align:center;">
                      ${descuentos} 
                    </div>
                    <button data-toggle="modal" onclick="productSelected(${data.data[product].id}, ${data.data[product].precio_id}, ${data.data[product].Descuentos})" style="width:100%" data-target="#staticBackdrop" type="button" class="btn btn-success btn-lg">Comprar</button>
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
    await fetch(`${url}/pedido`,{
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

