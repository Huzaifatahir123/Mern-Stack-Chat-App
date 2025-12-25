import CryptoJS from "crypto-js"
const secretKey = "18751510"
export const encryptMessage = (message)=>{
            try {
                const ciphertext = CryptoJS.AES.encrypt(message,secretKey).toString();
                return ciphertext;
            } catch (error) {
                console.log(error,"error occured in encryptMessage");
                return message;
            }
}
export const decryptMessage = (message) => {
    try {
        const bytes = CryptoJS.AES.decrypt(message, secretKey);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);

        
        if (!plainText) {
            console.error("Failed to decrypt message");
            return message;
        }

        return plainText;
    } catch (error) {
        console.error("Decryption failed:", error);
        return message;
    }
};