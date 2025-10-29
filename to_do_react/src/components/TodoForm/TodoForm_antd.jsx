import React from "react";
import {Input, Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import styles from "./TodoForm_antd.module.css";

export default function TodoForm({
                                     onCreate,
                                     onCancel,
                                     title,
                                     setTitle,
                                     description,
                                     setDescription,
                                     errors,
                                     setErrors,
                                 }) {
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {...errors};
        let hasError = false;

        if (!title.trim()) {
            newErrors.title = "Please enter a title";
            hasError = true;
        } else {
            newErrors.title = "";
        }

        if (!description.trim()) {
            newErrors.description = "Please enter a description";
            hasError = true;
        } else {
            newErrors.description = "";
        }

        setErrors(newErrors);

        if (!hasError) {
            onCreate({title, description});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <h3 className="fw-semibold text-center">CREATE NEW TASK</h3>
            <div className="row gy-3">
                {/* Input Title */}
                <div className="col-12">
                    <div className="form-label fw-semibold mb-1">Title</div>
                    <Input
                        placeholder="Enter title"
                        size="large"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (errors.title) setErrors({...errors, title: ""});
                        }}
                        status={errors.title ? "error" : ""}
                        className="w-100"
                    />
                    {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
                </div>

                {/* Input Description */}
                <div className="col-12">
                    <div className="form-label fw-semibold mb-1">Description</div>
                    <Input
                        placeholder="Enter description"
                        size="large"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            if (errors.description) setErrors({...errors, description: ""});
                        }}
                        status={errors.description ? "error" : ""}
                        className="w-100"
                    />
                    {errors.description && <div className="text-danger small mt-1">{errors.description}</div>}
                </div>

                {/* Hàng nút: căn giữa + tách xa input */}
                <div className="col-12 d-flex justify-content-center gap-3 mt-4 pt-2">
                    <Button type="primary" icon={<PlusOutlined/>} size="large" htmlType="submit">
                        Create
                    </Button>
                    <Button size="large" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>


    );
}
