document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".yt-lazy-container").forEach((videoContainer) => {
        const videoId = videoContainer.getAttribute("data-video-id");
        const thumbnailWrapper = videoContainer.querySelector(".yt-thumbnail-placeholder");

        thumbnailWrapper.addEventListener("click", () => {
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true;

            // Ensure iframe replaces only the thumbnail, keeping its size
            videoContainer.innerHTML = ""; // Remove thumbnail
            videoContainer.appendChild(iframe);

            // Apply correct width/height immediately after adding
            iframe.style.width = "100%";
            iframe.style.height = "100%";
        });
    });
});