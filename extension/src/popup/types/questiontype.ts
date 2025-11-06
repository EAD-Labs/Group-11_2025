//  {
//     question: {
//         type: String,
//         required: true,
//       },
//       options: [
//         {
//           option: {
//             type: String,
//             required: true,
//           },
//           isCorrect: {
//             type: Boolean,
//             required: true,
//           },
//         },
//       ],
//     },

export interface QuestionType {
  question: string;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
  answered: boolean;
}
