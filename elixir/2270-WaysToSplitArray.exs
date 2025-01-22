defmodule Solution do
  @spec ways_to_split_array(nums :: [integer]) :: integer
  def ways_to_split_array(nums) do
    {count, total} = sumUp(nums)
    countWays(count, total)
  end

  def sumUp(nums, cCount \\ [], cTotal \\ 0)

  def sumUp([last], cCount, cTotal) do
    cTotal = cTotal + last
    {cCount |> Enum.reverse(), cTotal}
  end

  def sumUp([head | rest], cCount, cTotal) do
    cTotal = cTotal + head
    cCount = [cTotal | cCount]
    sumUp(rest, cCount, cTotal)
  end

  def countWays(prefixSum, totalSum, currentWays \\ 0)

  def countWays([], _, cWays) do
    cWays
  end

  def countWays([head | rest], total, cWays) do
    cWays =
      if head >= total - head do
        cWays + 1
      else
        cWays
      end

    countWays(rest, total, cWays)
  end
end

nums = [2, 3, 1, 0]
# Output: 2
IO.inspect(Solution.ways_to_split_array(nums))

nums = [10, 4, -8, 7]
# Output: 2
IO.inspect(Solution.ways_to_split_array(nums))
