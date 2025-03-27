var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
    
    function opentab(tabname){
        for(tablink of tablinks){
            tablink.classList.remove("active-link");
        }
        for(tabcontent of tabcontents){
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }


    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("contactForm");
        const notification = document.getElementById("notification");
    
        document.getElementById("contactForm").addEventListener("submit", async function (event) {
            event.preventDefault();
    
            const formData = new FormData(this);
            try {
                const response = await fetch("send_mail.php", {
                    method: "POST",
                    body: formData
                });
    
                const result = await response.json();
                notification.innerHTML = "";
    
                if (result.status === "success") {
                    notification.className = "notification success";
                    notification.innerHTML = `
                        <span class='icon-cek'>✅</span>
                        <span class='message'>SUCCESS!</span>
                        <p>Thank you for your request.<br>We are working hard to find the best service and deals for you.</p>
                        <button onclick='hideNotification()'>Continue</button>
                    `;
                } else {
                    notification.className = "notification error";
                    notification.innerHTML = `
                        <span class='icon'>&#9888;</span>
                        <span class='message'>ERROR!</span>
                        <p>We are unable to continue the process.<br>Please try again to complete the request.</p>
                        <button onclick='hideNotification()'>Try Again</button>
                    `;
                }
    
                // Menentukan posisi notifikasi agar muncul di tengah form
                const formRect = form.getBoundingClientRect();
                notification.style.top = `${formRect.top + window.scrollY + formRect.height / 2}px`;
                notification.style.left = `${formRect.left + window.scrollX + formRect.width / 2}px`;
                notification.style.transform = "translate(-50%, -50%)";
                notification.style.display = "block";
    
            } catch (error) {
                console.error("Error:", error);
                alert("Terjadi kesalahan saat mengirim pesan.");
            }
        });
    });
    
    function hideNotification() {
        document.getElementById("notification").style.display = "none";
    }
    