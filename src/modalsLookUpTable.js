import AddAgentModal from "./components/modals/addAgentModal/AddAgentModal";
import AddConversationModal from "./components/modals/addConversationModal/AddConversationModal";
import { ComfirmationModal } from "./components/modals/comfirmationModal/ComfirmationModal";
import { SendChatTranscriptModal } from "./components/modals/sendChatTranscriptModal/SendChatTranscriptModal";
import TransferChatModal from "./components/modals/transferChatModal/TransferChatModal";

export const MODALS_LOOKUP_TABLE = {
  ADD_AGENT: AddAgentModal,
  ADD_PRIVATE_CHAT: AddConversationModal,
  COMFIRMATION: ComfirmationModal,
  SEND_CHAT_TRANSCRIPT: SendChatTranscriptModal,
  TRANSFER_CHAT: TransferChatModal,
};
