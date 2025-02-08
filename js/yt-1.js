document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".yt-lazy-container").forEach((videoContainer) => {
        const videoId = videoContainer.getAttribute("data-video-id");
        const thumbnailWrapper = videoContainer.querySelector(".yt-thumbnail-placeholder");

        thumbnailWrapper.addEventListener("click", () => {
            // Delete existing YouTube cookies (if any)
            deleteYouTubeCookies();

            // Load YouTube iframe
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute("title", "YouTube video player");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            iframe.setAttribute("allowfullscreen", "");

            // Replace the thumbnail with the YouTube iframe
            videoContainer.innerHTML = "";
            videoContainer.appendChild(iframe);
        });
    });

    function deleteYouTubeCookies() {
        const cookies = document.cookie.split("; ");
        cookies.forEach(cookie => {
            if (cookie.includes("youtube") || cookie.includes("SID") || cookie.includes("SAPISID") || cookie.includes("SSID")) {
                document.cookie = cookie + "=; path=/; domain=.youtube.com; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.cookie = cookie + "=; path=/; domain=.google.com; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            }
        });
    }
});