document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function () {

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();


        /*
         Save the details so the other pages
         can use them later.
        */

        localStorage.setItem(
            "agroName",
            name
        );

        localStorage.setItem(
            "agroPhone",
            phone
        );

        localStorage.setItem(
            "agroAddress",
            address
        );


        localStorage.setItem(
            "agroCustomer",
            JSON.stringify({
                name: name,
                phone: phone,
                address: address
            })
        );

    });

});
