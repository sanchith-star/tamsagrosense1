document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       LOGIN PAGE
    ========================================= */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function () {

            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const address =
                document.getElementById("address").value.trim();


            /* Save customer information */

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

        });

    }


    /* =========================================
       ORDER PAGE
    ========================================= */

    const orderForm =
        document.getElementById("orderForm");


    if (orderForm) {

        const name =
            localStorage.getItem("agroName") || "";

        const phone =
            localStorage.getItem("agroPhone") || "";

        const address =
            localStorage.getItem("agroAddress") || "";


        /* Put login details into order form */

        const nameBox =
            document.getElementById("customerName");

        const phoneBox =
            document.getElementById("customerPhone");

        const addressBox =
            document.getElementById("customerAddress");


        if (nameBox) {
            nameBox.value = name;
        }


        if (phoneBox) {
            phoneBox.value = phone;
        }


        if (addressBox) {
            addressBox.value = address;
        }


        /* =====================================
           PLACE ORDER
        ===================================== */

        orderForm.addEventListener(
            "submit",
            function () {

                /*
                 IMPORTANT:
                 Do NOT use preventDefault() here.

                 The browser must submit the form
                 to FormSubmit.
                */

                const submitButton =
                    orderForm.querySelector(
                        "button[type='submit']"
                    );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        "Sending Order... <span>✓</span>";

                }

            }
        );

    }


    /* =========================================
       RESET BUTTON
    ========================================= */

    const resetButtons =
        document.querySelectorAll(
            ".reset-button"
        );


    resetButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "agroName"
                );

                localStorage.removeItem(
                    "agroPhone"
                );

                localStorage.removeItem(
                    "agroAddress"
                );


                const nameBox =
                    document.getElementById(
                        "customerName"
                    );

                const phoneBox =
                    document.getElementById(
                        "customerPhone"
                    );

                const addressBox =
                    document.getElementById(
                        "customerAddress"
                    );


                if (nameBox) {
                    nameBox.value = "";
                }


                if (phoneBox) {
                    phoneBox.value = "";
                }


                if (addressBox) {
                    addressBox.value = "";
                }

            }
        );

    }

});
