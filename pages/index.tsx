import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";
import { useCallback, useState } from "react";
import Activities from "../components/Activities";
import BookNow from "../components/BookNow";
import { Activity } from "../types/activity";
import Header from "../components/Header";

export const getServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const bookings = await db.collection("bookings").find({}).toArray();
    const activities = await db.collection("activities").find({}).toArray();

    const activitiesWithSalesCount = activities.map((activity) => {
      const bookingsForActivity = bookings.filter(
        (booking) => booking.activity.toString() === activity._id.toString()
      );
      const sales = bookingsForActivity.reduce((acc) => acc + 1, 0);
      return { ...activity, sales };
    }, []);

    return {
      props: {
        activities: JSON.parse(JSON.stringify(activitiesWithSalesCount)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { activitiesData: [] },
    };
  }
};

interface IndexProps {
  activities: Activity<string>[];
}

const Index = ({ activities }: IndexProps) => {
  const [isBookigNowOpen, setIsBookNowOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<
    string | undefined
  >();
  const [isFull, setIsFull] = useState<boolean>(false);

  const handleBookNow = useCallback((activityId: string, full: boolean) => {
    setIsBookNowOpen(true);
    setSelectedActivityId(activityId);
    setIsFull(full);
  }, []);

  const handleCloseBookNow = useCallback(() => {
    setIsBookNowOpen(false);
    setSelectedActivityId("");
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <main className="isolate">
        <div className="relative pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#b8e994] to-[#2ca58d] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  The activites you love, all in one place
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  From hiking to kayaking, find the perfect activity for you.
                </p>
              </div>
              <Activities
                activities={activities}
                handleBookNow={handleBookNow}
              />
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#b8e994] to-[#2ca58d] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </main>
      <BookNow
        open={isBookigNowOpen}
        setOpen={handleCloseBookNow}
        activityId={selectedActivityId}
        isFull={isFull}
      />
    </div>
  );
};

export default Index;
