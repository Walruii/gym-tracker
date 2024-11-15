import { fetchWithRetry } from "@/serverActions/fetch";
import ExerciseItem from "./item";
import { IExercise } from "@/Types/models";

const getExercises = async () => {
  "use server";
  const response = await fetchWithRetry(`${process.env.API_URI}/exercise`, {
    method: "GET",
  });
  if (response.status !== 200) {
    console.error("Failed to fetch muscles");
    return null;
  }
  const data = await response.json();
  console.log(data);

  return data;
};

export default async function Page() {
  const exercises: IExercise[] = await getExercises();
  return (
    <>
      <h1 className="container mx-auto text-end font-semi-bold text-4xl my-8 dark:text-white font-black">
        EXERCISES
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 container mx-auto mb-20">
        {exercises ? (
          exercises.map((exercise) => (
            <ExerciseItem
              key={exercise._id}
              name={exercise.name}
              muscle={exercise.muscle.name}
              image={null} // add image
              description={exercise.description} // add description to muscle model
            />
          ))
        ) : (
          <p>Failed to Fetch Exercises</p>
        )}
      </div>
    </>
  );
}
