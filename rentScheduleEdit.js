import getToken, { user, pass, dlAuth } from "./login.js";
let firstRent = "2023-10-31"; //
let lastRent = ""; //leave blank to not change, format="2023-10-31"
let rentLines = [
  //uncomment and adjust as neeeded,
  //   {
  //     amount: 30.0,
  //     account: schedule.leaseRentInfo.lines[0].account,
  //     balance: schedule.leaseRentInfo.lines[0].balance,
  //     balanceHistory: schedule.leaseRentInfo.lines[0].balanceHistory,
  //     memo: schedule.leaseRentInfo.lines[0].memo,
  //   },
];
//use rentLines to set the amount of the rent schedule assuming that you only want one line
// only the non-commented variables will be changed

let rentListURL =
  "/lease-recurring-transactions/?&page_size=1000&page_number=1&filter_noTasks=true&filter_type=LEASE_RENT&filter_status=ACTIVE";

async function getRentSchedules() {
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.get(rentListURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  return response.data.data;
}

let rentList = await getRentSchedules();

async function editRentSchedules(startDate, endDate, rentLines) {
  for (let schedule of rentList) {
    let rentID = schedule.id;
    let rentEditURL = "/lease-recurring-transactions/" + rentID;
    let start = startDate || schedule.start;
    let end = endDate || schedule.end;
    let lines = rentLines;
    if (lines.length == 0) {
      let lines = [];
      for (let i in schedule.leaseRentInfo.lines) {
        lines.push({
          amount: schedule.leaseRentInfo.lines[i].amount,
          account: schedule.leaseRentInfo.lines[i].account,
          balance: schedule.leaseRentInfo.lines[i].balance,
          balanceHistory: schedule.leaseRentInfo.lines[i].balanceHistory,
          memo: schedule.leaseRentInfo.lines[i].memo,
        });
        if (i == schedule.leaseRentInfo.lines.length - 1) {
          console.log(start);
          let payload = {
            end: end,
            lease: schedule.lease,
            property: schedule.property,
            unit: schedule.unit,
            noEndDate: schedule.noEndDate,
            frequency: schedule.frequency,
            nextOccurrence: schedule.nextOccurrence,
            occurrencesRemaining: schedule.occurrencesRemaining,
            start: start,
            status: schedule.status,
            type: schedule.type,
            memo: schedule.memo,
            createdByType: schedule.createdByType,
            leaseRentInfo: {
              lines: lines,
            },
            id: schedule.id,
            total: schedule.total,
            reference: schedule.reference,
          };

          // Get token for login and request endpoint
          const token = await getToken(user, pass);
          let response = await dlAuth.put(rentEditURL, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          console.log("rent schedule " + rentID + " updated");
        }
      }
    } else {
      let payload = {
        end: end,
        lease: schedule.lease,
        property: schedule.property,
        unit: schedule.unit,
        noEndDate: schedule.noEndDate,
        frequency: schedule.frequency,
        nextOccurrence: schedule.nextOccurrence,
        occurrencesRemaining: schedule.occurrencesRemaining,
        start: start,
        status: schedule.status,
        type: schedule.type,
        memo: schedule.memo,
        createdByType: schedule.createdByType,
        leaseRentInfo: {
          lines: lines,
        },
        id: schedule.id,
        total: schedule.total,
        reference: schedule.reference,
      };

      // Get token for login and request endpoint
      const token = await getToken(user, pass);
      let response = await dlAuth.put(rentEditURL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log("rent schedule " + rentID + " updated");
    }
  }
}

editRentSchedules(firstRent, lastRent, rentLines);
