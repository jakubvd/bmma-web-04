document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".yt-lazy-container").forEach((videoContainer) => {
        const videoId = videoContainer.getAttribute("data-video-id");
        const thumbnailWrapper = videoContainer.querySelector(".yt-thumbnail-placeholder");

        thumbnailWrapper.addEventListener("click", () => {
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute("title", "YouTube video player");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            iframe.setAttribute("allowfullscreen", "");

            // Remove the thumbnail & insert iframe
            videoContainer.innerHTML = "";
            videoContainer.appendChild(iframe);
        });
    });
});