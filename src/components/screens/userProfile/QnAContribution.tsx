//tabs
// tabs-panel [Panel Comp]
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import QAPanel from "./QAPanel";
import { UserType } from "../../../globalClasses/User";

export type PANEL_LABELS_TYPE = {
  answers: "answers";
  questions: "questions";
};

export const PANEL_LABELS: PANEL_LABELS_TYPE = {
  answers: "answers",
  questions: "questions",
};

const layoutConfig = [PANEL_LABELS.answers, PANEL_LABELS.questions];

export const TEXT_FIELD_FOR_SELECTED_INDEX = {
  [PANEL_LABELS.answers]: "description",
  [PANEL_LABELS.questions]: "title",
};
const QnAContribution = ({ user, loading }) => {
  const [selected, setSelected] = useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setSelected(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs onChange={handleChange} value={selected}>
          <Tab
            label={PANEL_LABELS[layoutConfig[0] as "answers" | "questions"]}
            id={PANEL_LABELS.answers}
          />
          <Tab
            label={PANEL_LABELS[layoutConfig[1] as "answers" | "questions"]}
            id={PANEL_LABELS.questions}
          />
        </Tabs>
      </Box>

      <QAPanel
        selectedIndex={selected}
        currentIndex={0}
        loading={loading}
        data={user?.[layoutConfig[0]]}
        layoutConfig={layoutConfig}
      />

      <QAPanel
        selectedIndex={selected}
        currentIndex={1}
        loading={loading}
        data={user?.[layoutConfig[1]]}
        layoutConfig={layoutConfig}
      />
    </Box>
  );
};

export default QnAContribution;
