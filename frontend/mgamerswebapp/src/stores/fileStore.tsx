import axiosInstance from "./axiosInstance";

const API_URL = "/Files";

export const fetchFile = async (name: string) => {
    try {


        const response = await axiosInstance.get(`${API_URL}/${name}`, {
            responseType: "blob"
        })
        // Create a URL for the downloaded file
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", name);  // Use the provided filename
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();

        // Optional: Clean up the object URL to avoid memory leaks
        setTimeout(() => window.URL.revokeObjectURL(fileURL), 500);
    } catch (error) {
        console.error("Error downloading the file:", error);
    }

};