const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData);

    try {
        const response = await fetch("/submit_contact_form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.redirect) {
                window.location.href = result.redirect; // Redirect to the specified URL
            }
        } else {
            alert("Submission failed. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again later.");
    }
});
