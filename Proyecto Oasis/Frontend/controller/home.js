const nf = new Intl.NumberFormat("es-MX");
let dataProductSelected;
let dataUserSelected = {};
let url = "https://tps2311ft-proyecto03.onrender.com";


(async () => {
    let dataUserStorage = JSON.parse(localStorage.getItem("dataUserStorage"));
    if (dataUserStorage == undefined) {
        alertSwetAlert("Cierre sesion y vuelva a ingresar");
    } else {
        let url = "https://tps2311ft-proyecto03.onrender.com";

        await fetch(`${url}/products`)
            .then((response) => response.json())
            .then((data) => {
                if (data.data != undefined && data.data.length > 0) {
                    let products = ``;

                    for (let product = 0; product < data.data.length; product++) {

                        products += `
                    <tr>
                    <th scope="row">${data.data[product].id}</th>
                    <td>${data.data[product].names_id}</td>
                    <td>$ ${nf.format(data.data[product].precio_id)}</td>
                    <td>${data.data[product].Descuentos != null ? data.data[product].Descuentos : 0}%</td>
                    <td>
                        <button type="button" class="btn btn-danger" onclick="deleteProductSelected(${data.data[product].id});" ><i class="fa fa-trash"></i></button>
                        <button type="button" class="btn btn-warning" onclick="typeActionProduct('update'); productSelected(${data.data[product].id},'${data.data[product].names_id}', ${data.data[product].precio_id},'${data.data[product].DESCRIPTION}',${data.data[product].Descuentos}, '${data.data[product].imagen}');" data-toggle="modal" data-target="#modalEditProduct"><i class="fa fa-pencil"></i></button>
                    </td>
                  </tr>  
                    `;
                    }
                    document.querySelector(".listadoProducto").innerHTML = products;
                }
            });

        await fetch(`${url}/user`)
            .then((response) => response.json())
            .then((data) => {
                if (data != undefined && data.data.length > 0) {
                    let users = ``;
                    let disabled = "";
                    let dataUserStorage = JSON.parse(localStorage.getItem("dataUserStorage"));

                    if (dataUserStorage.idRol != 1) {
                        disabled = "disabled";
                        document.getElementById("btnAddUserModal").setAttribute("disabled", "");
                    }
                    for (let user = 0; user < data.data.length; user++) {

                        users += `
                    <tr>
                    <th scope="row">${data.data[user].id}</th>
                    <td>${data.data[user].login}</td>
                    <td>${data.data[user].email}</td>
                    <td>${data.data[user].telefono}</td>
                    <td style="padding:5px;">
                    <button type="button" class="btn btn-danger" ${disabled} onclick="deleteUserSelected(${data.data[user].id});" ><i class="fa fa-trash"></i></button>
                    <button type="button" class="btn btn-warning" ${disabled} data-toggle="modal" onclick="typeActionUser('update'); userSelected(${data.data[user].id},'${data.data[user].login}', '${data.data[user].email}', '${data.data[user].telefono}', ${data.data[user].idRol});" data-target="#modalEditUser"><i class="fa fa-pencil"></i></button>
                    </td>
                  </tr>  
                    `;
                    }
                    document.querySelector(".listadoUsuario").innerHTML = users;
                }
            })
    }

})();

const cerrarSesion = function () {
    localStorage.clear();
    location.href = "/";
}

const productSelected = function (id, names_id, precio, description, descuentos, imagen) {
    dataProductSelected = {
        id,
        names_id,
        precio_id: precio,
        DESCRIPTION: description == "null" ? "" : description,
        Descuentos: descuentos == "null" ? 0 : descuentos,
        imagen: imagen == "null" ? "" : imagen
    }

    document.getElementById("nombreProduct_id").value = dataProductSelected.names_id;
    document.getElementById("precioProduct_id").value = dataProductSelected.precio_id;
    document.getElementById("descripcionProduct_id").value = dataProductSelected.DESCRIPTION;
    document.getElementById("descuentoProduct_id").value = dataProductSelected.Descuentos;
}

const updateProduct = async function () {
    let file = document.getElementById("imagenProduct_id").files[0];

    dataProductSelected.names_id = document.getElementById("nombreProduct_id").value;
    dataProductSelected.precio_id = document.getElementById("precioProduct_id").value;
    dataProductSelected.DESCRIPTION = document.getElementById("descripcionProduct_id").value;
    dataProductSelected.Descuentos = document.getElementById("descuentoProduct_id").value == "" ? '0' : document.getElementById("descuentoProduct_id").value;

    if (dataProductSelected.names_id == "" || dataProductSelected.precio_id == "" || dataProductSelected.DESCRIPTION == "") {
        alertSwetAlert("Diligenciar todos los datos del formulario");
    } else {
    const formData = new FormData();
    formData.append("id", dataProductSelected.id);
    formData.append("names_id", dataProductSelected.names_id);
    formData.append("precio_id", dataProductSelected.precio_id);
    formData.append("DESCRIPTION", dataProductSelected.DESCRIPTION);
    formData.append("Descuentos", dataProductSelected.Descuentos);
    formData.append("imagen", dataProductSelected.imagen);
    formData.append("file", file != undefined ? file : "");

    await fetch(`${url}/products`, {
        method: "PUT",
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if (data != undefined && data.status == "Success") {
                location.reload();
            }
        });
    }
}

const addProduct = async function () {
    let file = document.getElementById("imagenProduct_id").files[0];

    dataProductSelected = {
        names_id: document.getElementById("nombreProduct_id").value,
        precio_id: document.getElementById("precioProduct_id").value,
        DESCRIPTION: document.getElementById("descripcionProduct_id").value,
        Descuentos: document.getElementById("descuentoProduct_id").value == "" ? '0' : document.getElementById("descuentoProduct_id").value,
        imagen: ""
    }

    const formData = new FormData();
    formData.append("names_id", dataProductSelected.names_id);
    formData.append("precio_id", dataProductSelected.precio_id);
    formData.append("DESCRIPTION", dataProductSelected.DESCRIPTION);
    formData.append("Descuentos", dataProductSelected.Descuentos);
    formData.append("imagen", "");
    formData.append("file", file != undefined ? file : "");

    if (dataProductSelected.names_id == "" || dataProductSelected.precio_id == "" || dataProductSelected.DESCRIPTION == "" || file == undefined) {
        alertSwetAlert("Diligenciar todos los datos del formulario");
    } else {
        await fetch(`${url}/products`, {
            method: "POST",
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                if (data != undefined && data.status == "Success") {
                    location.reload();
                }
            });
    }
}

const deleteProduct = async function (id) {

    await fetch(`${url}/products`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data != undefined && data.status == "Success") {
                location.reload();
            }
        });
}

const userSelected = async function (id, login, email, telefono, idRol) {
    dataUserSelected = {
        id,
        login,
        email,
        telefono,
        idRol
    }
    await loadTypesRol();
    document.getElementById("nombreUsuario_id").value = dataUserSelected.login;
    document.getElementById("correoUsuario_id").value = dataUserSelected.email;
    document.getElementById("telefonoUsuario_id").value = dataUserSelected.telefono;
}

const updateUser = async function () {
    dataUserSelected.login = document.getElementById("nombreUsuario_id").value;
    dataUserSelected.email = document.getElementById("correoUsuario_id").value;
    dataUserSelected.telefono = document.getElementById("telefonoUsuario_id").value;
    dataUserSelected.idRol = document.getElementById("idRolUsuario").value;

    if (dataUserSelected.login == undefined || dataUserSelected.email == undefined || dataUserSelected.telefono == undefined || dataUserSelected.idRol == undefined ||
        dataUserSelected.login == "" || dataUserSelected.email == "" || dataUserSelected.telefono == "" || dataUserSelected.idRol == "") {
        alertSwetAlert("Diligenciar todos los datos del formulario");
    } else {
        await fetch(`${url}/user`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUserSelected)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data != undefined && data.status == "Success") {
                    location.reload();
                }
            });
    }
}

const addUser = async function () {

    dataUserSelected = {
        login: document.getElementById("nombreUsuario_id").value,
        password: document.getElementById("password_id").value,
        nickname: document.getElementById("nickname_id").value,
        email: document.getElementById("correoUsuario_id").value,
        telefono: document.getElementById("telefonoUsuario_id").value,
        idRol: document.getElementById("idRolUsuario").value
    }
    if (dataUserSelected.login == "" || dataUserSelected.password == "" || dataUserSelected.nickname == ""
        || dataUserSelected.email == "" || dataUserSelected.telefono == "" || dataUserSelected.idRol == "") {
        alertSwetAlert("Diligenciar todos los datos del formulario");
    } else {
        await fetch(`${url}/user`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUserSelected)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data != undefined && data.status == "Success") {
                    location.reload();
                }
            });
    }
}

const deleteUser = async function (id) {
    await fetch(`${url}/user`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data != undefined && data.status == "Success") {
                location.reload();
            }
        });
}

const loadTypesRol = async function () {
    await fetch(`${url}/rol`)
        .then((response) => response.json())
        .then((data) => {
            if (data != undefined && data.status == "Success") {
                let optionsSelect = ``;
                let count = 0;
                for (let rol = 0; rol < data.data.length; rol++) {
                    count++;
                    
                    if (parseInt(dataUserSelected.idRol) == count) {
                        optionsSelect += `
                    <option value="${count}" selected="selected">${data.data[rol].description}</option>
                    `;
                    } else {
                        optionsSelect += `
                    <option value="${count}" >${data.data[rol].description}</option>
                    `;
                    }
                }
                document.querySelector("#idRolUsuario").innerHTML = optionsSelect;
            }
        });
}

const typeActionProduct = function (typeAction) {
    if (typeAction == "insert") {

        document.getElementById("nombreProduct_id").value = "";
        document.getElementById("precioProduct_id").value = "";
        document.getElementById("descripcionProduct_id").value = "";
        document.getElementById("descuentoProduct_id").value == "";

        document.querySelector("#titleModalProduct").innerHTML = "Agregar producto";
        document.getElementById("btnUpdateProduct").style.display = "none";
        document.getElementById("btnAddProduct").style.display = "block";

    } else {
        document.querySelector("#titleModalProduct").innerHTML = "Editar producto";
        document.getElementById("btnUpdateProduct").style.display = "block";
        document.getElementById("btnAddProduct").style.display = "none";
    }
}

const typeActionUser = function (typeAction) {
    loadTypesRol();
    if (typeAction == "insert") {
        document.getElementById("nombreUsuario_id").value = "",
            document.getElementById("password_id").value = "",
            document.getElementById("nickname_id").value = "",
            document.getElementById("correoUsuario_id").value = "",
            document.getElementById("telefonoUsuario_id").value = "",

            document.querySelector("#titleModalUser").innerHTML = "Agregar usuario";
        document.getElementById("btnUpdateUser").style.display = "none";
        document.getElementById("btnAddUser").style.display = "block";
        document.getElementById("password_id").style.display = "block";
        document.getElementById("nickname_id").style.display = "block";

    } else {
        document.querySelector("#titleModalUser").innerHTML = "Editar usuario";
        document.getElementById("btnUpdateUser").style.display = "block";
        document.getElementById("btnAddUser").style.display = "none";
        document.getElementById("password_id").style.display = "none";
        document.getElementById("nickname_id").style.display = "none";
    }
}