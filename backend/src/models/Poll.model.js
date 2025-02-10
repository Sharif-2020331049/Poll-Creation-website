import mongoose, {Schema} from "mongoose";

const pollSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        {
            text: {
                type: String,
                required: true
            },
            vote : {
                type: Number,
                default: 0
            }
        }
    ]
},
{
    timestamps: true
}
)

export const Poll = mongoose.model("Poll", pollSchema)
