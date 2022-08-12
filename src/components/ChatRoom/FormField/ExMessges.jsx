import { MdOutlineClose } from "react-icons/md";
const messages = [
  "(*'ェ`)b",
  "(*'ェ`)ノシ",
  "うわなにをするくぁｗせｄｒｆｔｇｙふじこｌｐ",
  "死んじまったじゃねーか\nバカヤロウ",
  "こっちも空腹で\n死んじまったぞこのやろう",
  "うい",
  "ねえどこ！\nここどこなの！？",
];

const ExMessges = ({ setMessage, setOpenExMessage }) => {
  return (
    <div className="ex-messages">
      <div className="ex-messages-inner">
        {messages.map((message, index) => (
          <p onClick={() => setMessage(message)} key={index}>
            {message}
          </p>
        ))}
        <MdOutlineClose
          className="close-ex-messages-btn"
          onClick={() => setOpenExMessage(false)}
        />
      </div>
    </div>
  );
};

export default ExMessges;
