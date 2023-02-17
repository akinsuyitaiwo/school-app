import { repo } from "../../core";
import { db } from "../../models";
// import { FileData } from "../../utils";

// export const addFile = (data: FileData) =>
export const addFile = () =>
  repo(() =>
    db.users.findMany({
      // data,
    })
  );
