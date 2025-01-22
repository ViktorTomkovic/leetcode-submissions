defmodule Solution do
  @spec max_sum_of_three_subarrays(nums :: [integer], k :: integer) :: [integer]
  def max_sum_of_three_subarrays(nums, k) do
    sumsFromIndex =
      nums
      |> Enum.chunk_every(k, 1, :discard)
      |> List.foldl([], fn e, a -> [Enum.sum(e) | a] end)

    len = length(nums)

    sumsMap =
      (len - k)..0//-1
      |> Enum.zip_reduce(sumsFromIndex, %{}, fn index, value, acc ->
        Map.put(acc, index, value)
      end)

    # IO.inspect(sumsMap)
    sumsLen = len - k
    globals = %{:sumsMap => sumsMap, :sumsLen => sumsLen, :k => k}
    result = dfs(-k, 0, %{}, 0, globals)
    # IO.inspect(result)
    tl(elem(result, 0))
  end

  def dfs(cIndex, cSum, memo, 3, _globals) do
    memo = Map.put(memo, {3, cIndex}, {[cIndex], cSum})
    {[cIndex], cSum, memo}
  end

  def dfs(cIndex, cSum, memo, depth, globals) do
    if Map.has_key?(memo, {depth, cIndex}) do
      # IO.inspect({depth, cIndex})
    # if false do
      {indeces, sum} = Map.get(memo, {depth, cIndex})
      {indeces, sum, memo}
    else
      nIndex = cIndex + globals[:k]

      {maxIndSub, maxSumSub, memoSub} =
        if nIndex > globals[:sumsLen] do
          {[cIndex], 0, Map.put(memo, {depth, cIndex}, {[cIndex], 0})}
        else
          Enum.to_list((cIndex + globals[:k])..globals[:sumsLen])
          |> Enum.reduce({[], 0, memo}, fn nextIndex, {maxInd, maxSum, memo} ->
            {maxIndSub, maxSumSub, memoSub} =
              dfs(
                nextIndex,
                cSum + Map.get(globals[:sumsMap], nextIndex),
                memo,
                depth + 1,
                globals
              )

            {maxInd, maxSum} =
              if maxSumSub > maxSum do
                {maxIndSub, maxSumSub}
              else
                {maxInd, maxSum}
              end

            {maxInd, maxSum, Map.merge(memo, memoSub)}
          end)
        end

      memo =
        memo |> Map.merge(memoSub) |> Map.put({depth, cIndex}, {[cIndex | maxIndSub], maxSumSub})

      {[cIndex | maxIndSub], maxSumSub, memo}
    end
  end
end

nums = [1, 2, 1, 2, 6, 7, 5, 1]
k = 2
# Output: [0,3,5]
IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)

# nums = [1, 2, 1, 2, 1, 2, 1, 2, 1]
# k = 2
# # Output: [0,2,4]
# IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)

prev2 = Time.utc_now()
# n = 2*(10**4)
n = 1000
nums = Enum.to_list(1..n) |> Enum.map(fn _x -> Enum.random(1..(2**16)) end)
# target = Enum.random(1..1000)
k = :rand.uniform(floor(n / 3))
IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)
next2 = Time.utc_now()
diff2 = Time.diff(next2, prev2, :millisecond)
IO.puts("Time")
IO.puts(diff2)
