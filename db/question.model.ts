import { Document, model, models, Schema } from "mongoose";
export interface IQuestion extends Document {
	title: string;
	content: string;
	tags: Schema.Types.ObjectId[];
	views: number;
	upvotes: Schema.Types.ObjectId[];
	downvotes: Schema.Types.ObjectId[];
	author: Schema.Types.ObjectId;
	answers: Schema.Types.ObjectId[];
	createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
	title: { type: String, required: true },
	content: { type: String, required: true },
	tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }], //relation many->many
	views: { type: Number, default: 0 },
	upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }], //many->many
	downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }], //many->many
	author: { type: Schema.Types.ObjectId, ref: "User" },
	answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }], //many->many
	createdAt: { type: Date, default: Date.now },
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
