import Lead from "../leads/lead.model.js";

export const getDashboardAnalytics =
  async () => {
    const [
      totalLeads,
      convertedLeads,
      lostLeads,
      sourceStats,
      statusStats,
      monthlyGrowth,
    ] = await Promise.all([
      Lead.countDocuments(),

      Lead.countDocuments({
        status: "converted",
      }),

      Lead.countDocuments({
        status: "lost",
      }),

      Lead.aggregate([
        {
          $group: {
            _id: "$source",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ]),

      Lead.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]),

      Lead.aggregate([
        {
          $group: {
            _id: {
              year: {
                $year:
                  "$createdAt",
              },

              month: {
                $month:
                  "$createdAt",
              },
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),
    ]);

    const conversionRate =
      totalLeads > 0
        ? Number(
            (
              (convertedLeads /
                totalLeads) *
              100
            ).toFixed(2)
          )
        : 0;

    return {
      overview: {
        totalLeads,

        convertedLeads,

        lostLeads,

        conversionRate,
      },

      sourceStats,

      statusStats,

      monthlyGrowth,
    };
  };

export const getRevenueAnalytics =
  async () => {
    const revenue =
      await Lead.aggregate([
        {
          $match: {
            status:
              "converted",
          },
        },

        {
          $group: {
            _id: null,

            totalRevenue:
              {
                $sum:
                  "$dealValue",
              },

            deals: {
              $sum: 1,
            },

            averageDealValue:
              {
                $avg:
                  "$dealValue",
              },
          },
        },
      ]);

    return (
      revenue[0] || {
        totalRevenue: 0,
        deals: 0,
        averageDealValue: 0,
      }
    );
  };