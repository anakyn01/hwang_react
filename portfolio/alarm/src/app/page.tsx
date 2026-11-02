import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { styles} from "@/assets/css/alarm.styles";

export default function Home() {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.formBox)}>
      <input 
      type="text"
      {...stylex.props(styles.input)}
      />
      <button {...stylex.props(styles.submitBtn)}>알람추가하기</button>
      </div>
    </div>
  );
}
