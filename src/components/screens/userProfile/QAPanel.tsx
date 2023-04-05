import { Box } from "@mui/material";
import { PANEL_LABELS } from "./QnAContribution";
import Link from "next/link";
import { TEXT_FIELD_FOR_SELECTED_INDEX } from "./QnAContribution";
import type { PANEL_LABELS_TYPE } from "./QnAContribution";

interface BaseDataType {
  datePosted: string;
  id: string;
}

interface AnswerDataType extends BaseDataType {
  description: string;
}

interface QuestionDataType extends BaseDataType {
  title: string;
}

type QAPanelProps = {
  selectedIndex: number;
  currentIndex: number;
  loading: boolean;
  data: [AnswerDataType & QuestionDataType];
  layoutConfig: string[];
};

const QAPanel = ({
  selectedIndex = 0,
  currentIndex,
  loading,
  data,
  layoutConfig,
}: QAPanelProps) => {
  const attribute = TEXT_FIELD_FOR_SELECTED_INDEX[
    layoutConfig[selectedIndex] as keyof PANEL_LABELS_TYPE
  ] as "title" | "description";

  console.log("data", data);

  const getQuestionLinkForEntity = (
    type: keyof PANEL_LABELS_TYPE,
    entity
  ): string => {
    if (type === PANEL_LABELS.answers) {
      return `/q/${entity.questionId}`;
    }
    return `/q/${entity.id}`;
  };

  if (!loading && !data?.length) {
    return (
      <Box
        component="span"
        sx={{
          display: selectedIndex !== currentIndex ? "none" : "inline-block",
          marginTop: "12px",
        }}
      >
        No {layoutConfig[currentIndex]} yet
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: selectedIndex !== currentIndex ? "none" : "flex",
        flexDirection: "column",
        marginTop: "12px",
        maxWidth: "75ch",
        maxHeight: "65vh",
        overflow: "auto",
        borderStyle: "var(--root-border-style)",
        borderColor: "var(--root-border-color)",
        borderWidth: "var(--root-border-width)",
        borderRadius: "var(--root-border-radius)",
      }}
    >
      {loading ? (
        <Box component="span" sx={{ fontStyle: "italic", opacity: "0.7" }}>
          {" "}
          Fetching data...{" "}
        </Box>
      ) : (
        data.map((item) => (
          <Box
            sx={{
              padding: "12px",
              display: "flex",

              gap: "24px",
              "&:nth-child(even)": {
                backgroundColor: "white",
              },
              fontSize: "1.2rem",
            }}
          >
            <Box
              component="span"
              sx={{
                flex: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <Link
                href={getQuestionLinkForEntity(
                  layoutConfig[currentIndex] as "questions" | "answers",
                  item
                )}
              >
                {item[attribute]}
              </Link>
            </Box>

            <Box
              component="span"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item.datePosted}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default QAPanel;
