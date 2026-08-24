/* =====================================================
   AGROSENSE DYNAMICS
   MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   WAIT FOR PAGE TO LOAD
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       LOGIN / HOME PAGE
       ================================================= */

    const loginForm = document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            /*
             Prevent the browser from
             refreshing the page.
            */

            event.preventDefault();


            /* =========================================
               GET USER DETAILS
            ========================================= */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            /* =========================================
               VALIDATION
            ========================================= */

            if (name === "") {

                alert("Please enter your name.");

                document
                    .getElementById("name")
                    .focus();

                return;

            }


            if (phone === "") {

                alert("Please enter your phone number.");

                document
                    .getElementById("phone")
                    .focus();

                return;

            }


            if (address === "") {

                alert("Please enter your address.");

                document
                    .getElementById("address")
                    .focus();

                return;

            }


            /* =========================================
               PHONE VALIDATION
            ========================================= */

            const phonePattern =
                /^[0-9+\-\s()]{10,15}$/;


            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid phone number."
                );

                document
                    .getElementById("phone")
                    .focus();

                return;

            }


            /* =========================================
               SAVE DETAILS
            ========================================= */

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


            /* =========================================
               SAVE COMPLETE CUSTOMER OBJECT
            ========================================= */

            const customer = {

                name: name,

                phone: phone,

                address: address,

                date:
                    new Date().toLocaleString()

            };


            localStorage.setItem(
                "agroCustomer",
                JSON.stringify(customer)
            );


            /* =========================================
               BUTTON ANIMATION
            ========================================= */

            const button =
                loginForm.querySelector(
                    "button[type='submit']"
                );


            if (button) {

                button.disabled = true;

                button.innerHTML =
                    "Loading <span>✓</span>";

            }


            /* =========================================
               GO TO OVERVIEW PAGE
            ========================================= */

            setTimeout(function () {

                window.location.href =
                    "overview.html";

            }, 450);

        });

    }


    /* =================================================
       LOAD CUSTOMER DATA ON OTHER PAGES
       ================================================= */

    const savedName =
        localStorage.getItem("agroName");


    const savedPhone =
        localStorage.getItem("agroPhone");


    const savedAddress =
        localStorage.getItem("agroAddress");


    /* =================================================
       DISPLAY NAME IF ELEMENT EXISTS
       ================================================= */

    const nameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );


    nameElements.forEach(function (element) {

        if (savedName) {

            element.textContent =
                savedName;

        }

    });


    /* =================================================
       DISPLAY PHONE IF ELEMENT EXISTS
       ================================================= */

    const phoneElements =
        document.querySelectorAll(
            "[data-user-phone]"
        );


    phoneElements.forEach(function (element) {

        if (savedPhone) {

            element.textContent =
                savedPhone;

        }

    });


    /* =================================================
       DISPLAY ADDRESS IF ELEMENT EXISTS
       ================================================= */

    const addressElements =
        document.querySelectorAll(
            "[data-user-address]"
        );


    addressElements.forEach(function (element) {

        if (savedAddress) {

            element.textContent =
                savedAddress;

        }

    });


    /* =================================================
       PAGE REVEAL ANIMATION
       ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    revealElements.forEach(function (element, index) {

        element.style.animationDelay =
            (index * 0.08) + "s";

    });


    /* =================================================
       FEEDBACK STAR SYSTEM
       ================================================= */

    const stars =
        document.querySelectorAll(
            ".star"
        );


    if (stars.length > 0) {

        stars.forEach(function (star) {

            star.addEventListener(
                "click",
                function () {

                    const rating =
                        Number(
                            star.dataset.rating
                        );


                    stars.forEach(
                        function (item) {

                            const itemRating =
                                Number(
                                    item.dataset.rating
                                );


                            if (
                                itemRating <= rating
                            ) {

                                item.classList.add(
                                    "active"
                                );

                            } else {

                                item.classList.remove(
                                    "active"
                                );

                            }

                        }
                    );


                    localStorage.setItem(
                        "agroRating",
                        rating
                    );

                }
            );

        });

    }


    /* =================================================
       RESET BUTTON
       ================================================= */

    const resetButtons =
        document.querySelectorAll(
            ".reset-button"
        );


    resetButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to reset the entered details?"
                    );


                if (!confirmed) {

                    return;

                }


                localStorage.removeItem(
                    "agroName"
                );


                localStorage.removeItem(
                    "agroPhone"
                );


                localStorage.removeItem(
                    "agroAddress"
                );


                localStorage.removeItem(
                    "agroCustomer"
                );


                localStorage.removeItem(
                    "agroRating"
                );


                location.reload();

            }
        );

    });


});
