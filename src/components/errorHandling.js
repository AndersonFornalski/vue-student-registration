//ERROS//
const errorHandling = (error) => {
    if(!error.response || !error.response.data){
        return { status: 500, message: "Ocorreu um erro no servidor. Tente novamente." };
    }
    if(error.response.data.error) 
        return { status: 400 , message: error.response.data.error };
}
export default errorHandling;