// to jest ok na ten moment najlesze rozwiązanie

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        // ✅ List of video IDs that SHOULD SHOW recommended videos (ALLOW-LIST)
        const allowRecommendations = [
            "_rPM9OF-AIE", // DZIEŃ ADRIANA BARTOSIŃSKIEGO
            "7r6V8vAcwBg", // MOTORYKA z prof. PEPŁOWSKIM
            "xAKqXcG3b7k", // "SPARING" z PAWLAKIEM
            "wF2eobbOGrs", // jak wyjść z balachy ?
            "VnyozbCzU6s", // Oficjalne OŚWIADCZENIE (Q&A)
            "7gv8e54TxdU"  // PRZEGRAŁEM
        ];

        // **Block recommendations for ALL videos, except those in allow-list**
        const isAllowed = allowRecommendations.includes(videoId);
        const relValue = isAllowed ? "0" : "0"; // rel=0 (same channel) for allowed, block for others
        const extraParams = isAllowed 
            ? "" 
            : "&controls=1&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1"; // Blocks overlays

        function loadVideo() {
            // Remove existing iframe to prevent duplicates
            videoContainer.innerHTML = "";

            // Create YouTube iframe
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}&playsinline=1`;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true;

            // Append iframe inside the container
            videoContainer.appendChild(iframe);

            // ❌ Block "More Videos" popups for all non-allowed videos
            if (!isAllowed) {
                setTimeout(() => {
                    iframe.contentWindow.postMessage('{"event":"command","func":"hidePopups","args":""}', '*');
                }, 2000); // Delay to ensure YouTube loads first
            }
        }

        // Attach event listener to the play button
        playButton.addEventListener("click", loadVideo);
    });
});