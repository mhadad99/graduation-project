/** @format */

import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Send, Paperclip, EmojiSmile } from "react-bootstrap-icons";

const ChatInput = ({ messageText, onMessageChange, onSubmit }) => {
  return (
    <div className="chat-input">
      <Form onSubmit={onSubmit}>
        <InputGroup>
          <Button variant="light" className="action-button">
            <Paperclip />
          </Button>
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={onMessageChange}
          />
          <Button variant="light" className="action-button">
            <EmojiSmile />
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="action-button"
            disabled={!messageText.trim()}>
            <Send />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default ChatInput;
