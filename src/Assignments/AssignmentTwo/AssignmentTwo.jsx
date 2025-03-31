import React from "react";
import "./AssignmentTwo.css";

// Box Component that receives title and content as props
function Box({ title, content }) {
  return (
    <div className="box">
      <h2 className="box-title">{title}</h2>
      <p className="box-content">{content}</p>
    </div>
  );
}

function AssignmentTwo() {
  const data = [
    {
      title: "Portfolio Website for Personal Branding",
      content:
        "A personal website to showcase my projects, skills, and experience. It will include an interactive UI, blog section, and a contact form.",
    },
    {
      title: "Gamified to do list app with aid of AI",
      content:
        "A to-do list application that gamifies task management by rewarding users for completing tasks. It will use AI to suggest tasks based on user preferences.",
    },
    {
      title: "Startup Website for School Organization",
      content:
        "A website for a school organization to promote events, share resources, and connect with students. It will include a calendar, event registration, and a blog.",
    },
  ];

  return (
    <div className="title-container">
      <h1>Top 3 Major Projects for 2025</h1>
      <p>
        Learn how to pass and manage data between parent and child components
        using props. This exercise focuses on modular, reusable components by
        dynamically rendering project details inside child components.
      </p>
      <div className="box-container">
        {data.map((item, index) => (
          <Box key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
}

export default AssignmentTwo;
