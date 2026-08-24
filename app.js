const PROFILE_KEY = "agrosenseProfile";


// ================================
// HOME PAGE
// ================================

const profileForm =
    document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById("name")
                .value.trim();

            const address =
                document.getElementById("address")
                .value.trim();

            const phone =
                document.getElementById("phone")
                .value.trim();

            if (!name || !address || !phone) {

                alert(
                    "Please fill in all details."
                );

                return;
            }

            const profile = {
                name: name,
                address: address,
                phone: phone
            };

            localStorage.setItem(
                PROFILE_KEY,
                JSON.stringify(profile)
            );

            pageTransition(
                "overview.html"
            );
        }
    );
}


// ================================
// PAGE TRANSITION
// ================================

function pageTransition(url) {

    document.body.style.opacity = "0";

    document.body.style.transform =
        "translateY(10px)";

    document.body.style.transition =
        "opacity .3s ease, transform .3s ease";

    setTimeout(function() {

        window.location.href = url;

    }, 300);
}


// ================================
// LOAD PROFILE
// ================================

function getProfile() {

    const saved =
        localStorage.getItem(
            PROFILE_KEY
        );

    if (!saved) {
        return null;
    }

    try {

        return JSON.parse(saved);

    } catch {

        return null;

    }
}


// ================================
// ORDER PAGE
// ================================

const customerDetails =
    document.getElementById(
        "customerDetails"
    );

if (customerDetails) {

    const profile = getProfile();

    if (!profile) {

        customerDetails.innerHTML = `
            <p>
                No customer details found.
                Please return to the Home page.
            </p>
        `;

    } else {

        customerDetails.innerHTML = `
            <strong>
                ${escapeHTML(profile.name)}
            </strong>

            <br>

            ${escapeHTML(profile.address)}

            <br>

            ${escapeHTML(profile.phone)}
        `;
    }
}


// ================================
// PLACE ORDER
// ================================

const orderForm =
    document.getElementById(
        "orderForm"
    );

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const profile = getProfile();

            if (!profile) {

                alert(
                    "Please enter your details on the Home page first."
                );

                return;
            }

            const subject =
                encodeURIComponent(
                    "New AgroSense Dynamics Order"
                );

            const body =
                encodeURIComponent(
`
AGROSENSE DYNAMICS ORDER

Customer Name:
${profile.name}

Address:
${profile.address}

Phone Number:
${profile.phone}

Product:
AgroSense Smart Farm Protection System

Quantity:
1

TOTAL:
₹18,000
`
                );

            window.location.href =
                "mailto:agrosensedynamics@gmail.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;

        }
    );
}


// ================================
// STAR RATING
// ================================

const stars =
    document.querySelectorAll(".star");

const rating =
    document.getElementById("rating");

stars.forEach(function(star) {

    star.addEventListener(
        "click",
        function() {

            const selected =
                Number(
                    star.dataset.rating
                );

            rating.value = selected;

            stars.forEach(function(item) {

                const value =
                    Number(
                        item.dataset.rating
                    );

                if (value <= selected) {

                    item.classList.add(
                        "active"
                    );

                } else {

                    item.classList.remove(
                        "active"
                    );

                }

            });

        }
    );

});


// ================================
// FEEDBACK
// ================================

const feedbackForm =
    document.getElementById(
        "feedbackForm"
    );

if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (!rating.value) {

                alert(
                    "Please select a star rating."
                );

                return;
            }

            const feedback =
                Object.fromEntries(
                    new FormData(
                        feedbackForm
                    )
                );

            localStorage.setItem(
                "agrosenseFeedback",
                JSON.stringify(feedback)
            );

            const success =
                document.getElementById(
                    "feedbackSuccess"
                );

            success.classList.remove(
                "hidden"
            );

            feedbackForm.reset();

            rating.value = "";

            stars.forEach(function(star) {

                star.classList.remove(
                    "active"
                );

            });

        }
    );

}


// ================================
// RESET FEEDBACK
// ================================

function resetFeedback() {

    const form =
        document.getElementById(
            "feedbackForm"
        );

    if (form) {
        form.reset();
    }

    if (rating) {
        rating.value = "";
    }

    stars.forEach(function(star) {

        star.classList.remove(
            "active"
        );

    });

    const success =
        document.getElementById(
            "feedbackSuccess"
        );

    if (success) {

        success.classList.add(
            "hidden"
        );

    }
}


// ================================
// SECURITY
// ================================

function escapeHTML(value) {

    return String(value).replace(
        /[&<>"']/g,

        function(character) {

            return {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            }[character];

        }
    );
}
