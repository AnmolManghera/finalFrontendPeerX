import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

const TABLE_HEAD = ["User", "Field", "Request Type", "Accept", "Reject"];

export function NotificationsTable({ notifications ,handleConnectionRequest, handleInterviewRequest}) {
  
  return (
    <Card className="h-full w-[80%] mx-auto">
     
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notifications.map(({ _id, sender, requestType ,data}, index) => {
              const isLast = index === notifications.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={sender.url}
                        alt={name}
                        size="md"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {sender.name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {requestType === "MOCK INTERVIEW" ? `REQUEST DATE : ${data}` : ""}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {requestType}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <button
                        onClick={() => {
                          requestType === "CONNECTION" ?  handleConnectionRequest({ requestId: _id, accept: true }) : handleInterviewRequest({ requestId: _id, accept: true,reqTD:data })
                        }}
                      >
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={"ACCEPT"}
                          color={"green"}
                        />
                      </button>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <button
                        onClick={() => {
                            requestType === "CONNECTION" ?  handleConnectionRequest({ requestId: _id, accept: false }) : handleInterviewRequest({ requestId: _id, accept: false })
                        }}
                      >
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={"REJECT"}
                          color={"red"}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
