import { Document, model, models, Schema } from "mongoose";

interface IAnswer extends Document {
	question: Schema.Types.ObjectId;
	author: Schema.Types.ObjectId;
	content: string;
	upvotes: Schema.Types.ObjectId[];
	downvotes: Schema.Types.ObjectId[];
	createdAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
	question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	content: { type: String, required: true },
	upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }], //many->many
	downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }], //many->many
	createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
