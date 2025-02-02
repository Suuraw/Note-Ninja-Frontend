import axios from "axios"
const SERVER_URL=import.meta.env.VITE_SERVER_URL;
export const audioHandler=async(inputData)=>{
  try {
    console.log("SERVER HIT",inputData)
    // const response=await axios.post(SERVER_URL,inputData,{
    //     headers:{
    //         "Content-Type":"application/json",
    //     }
    // });
    // return response.data;
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla consectetur, auctor lorem eu, auctor eros. Suspendisse potenti. Morbi vulputate consequat metus, a pretium lectus interdum ac. Donec dictum purus ut justo efficitur, nec fermentum ante varius. Nunc euismod leo nec turpis volutpat iaculis. Etiam tempor tristique orci in sodales. Curabitur ac urna id augue pretium posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec rhoncus turpis eget velit cursus, non condimentum dui gravida. Aliquam erat volutpat. Proin eget mi sit amet dui eleifend sodales.

Maecenas sed consectetur lorem. Nam iaculis tortor sit amet libero tincidunt, vitae lobortis lectus volutpat. Mauris eget nisi ut magna rhoncus eleifend. Fusce pharetra felis sit amet dolor viverra, vel interdum justo rhoncus. Phasellus nec turpis nec nunc dictum volutpat. Etiam ultricies, purus at auctor posuere, augue dui faucibus ligula, et pharetra risus nunc id dui. In dictum enim vitae risus pretium, et laoreet elit efficitur. Fusce pharetra mi ac leo dapibus sollicitudin. Integer ac mi sed justo lacinia pharetra ut in nunc.`
  } catch (error) {
    return "error text"
    console.log("Issue with the server");
  }
}

export const handlePrompt=async(inputText)=>{
    try {
        console.log("SERVER HIT");
    } catch (error) {
        
    }
}