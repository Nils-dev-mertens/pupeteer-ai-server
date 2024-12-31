export default function calculatePrice(whole, sub) {
    const wholearr = whole.split('\n');
    return `${wholearr[0]},${sub}`
}
// export default {
//     returnwholeprice: (whole, sub) => {
//         const wholearr = whole.split('\n');
//         return `${wholearr[0]}, ${sub}`
//     },
//   };