defmodule Solution do
  @spec find_target_sum_ways(nums :: [integer], target :: integer) :: integer
  def find_target_sum_ways(nums, target) do
    # dfs(target, nums, 0)
    # dfs_with_memo(target, nums, 0, Map.new(), 0)[:count]
    dpInit =
      if hd(nums) == 0 do
        %{0 => 2}
      else
        %{hd(nums) => 1, -hd(nums) => 1}
      end

    dp(target, tl(nums), dpInit)
  end

  def dfs(target, [], currentSum) do
    case currentSum - target do
      0 -> 1
      _ -> 0
    end
  end

  def dfs(target, [head | tail], currentSum) do
    dfs(target, tail, currentSum + head) + dfs(target, tail, currentSum - head)
  end

  def dfs_with_memo(target, [], currentSum, memo, currentLevel) do
    case currentSum - target do
      0 -> %{count: 1, memo: Map.put(memo, [currentLevel, currentSum], 1)}
      _ -> %{count: 0, memo: Map.put(memo, [currentLevel, currentSum], 0)}
    end
  end

  def dfs_with_memo(target, [head | tail], currentSum, memo, currentLevel) do
    if Map.has_key?(memo, [currentLevel, currentSum]) do
      %{count: Map.get(memo, [currentLevel, currentSum]), memo: memo}
    else
      %{count: countA, memo: memoA} =
        dfs_with_memo(target, tail, currentSum + head, memo, currentLevel + 1)

      %{count: countB, memo: memoB} =
        dfs_with_memo(target, tail, currentSum - head, memoA, currentLevel + 1)

      memoC = Map.put(memoB, [currentLevel, currentSum], countA + countB)
      %{count: countA + countB, memo: memoC}
    end
  end

  def dp(target, [], computed) do
    IO.inspect(computed)
    Map.get(computed, target, 0)
  end

  def dp(target, [num | restNums], possibleWaysToMakeKey) do
    nextDPLayer =
      Enum.reduce(possibleWaysToMakeKey, Map.new(), fn {key, value}, acc ->
        Map.update(acc, key + num, value, &(&1 + value))
          |> Map.update(key - num, value, &(&1 + value))
      end)

    IO.inspect(possibleWaysToMakeKey)
    dp(target, restNums, nextDPLayer)
  end

  def find_sums([], sum, result), do: [sum | result]

  def find_sums([h | tail], sum, result) do
    result = find_sums(tail, sum + h, result)
    result = find_sums(tail, sum - h, result)
    result
  end

  def mixed(target, nums) do
    len = length(nums)
    # Enum.chunk_every(nums, ceil(len / 2))
    [first, second] =
      Enum.chunk_every(nums, ceil(len / 2))
      |> Enum.map(&find_sums(&1, 0, []))
      |> Enum.map(&Enum.frequencies(&1))

    IO.inspect([first, second])
    arar =
      Enum.chunk_every(nums, ceil(2))
      |> Enum.map(&find_sums(&1, 0, []))
      |> Enum.map(&Enum.frequencies(&1))

    IO.inspect(arar)

    first
    |> Enum.map(fn {k, v} -> v * Map.get(second, target - k, 0) end)
    |> Enum.sum()
  end
end

nums = [1, 1, 1, 1, 1]
target = 3
# 5
IO.puts(Solution.find_target_sum_ways(nums, target))
IO.inspect(Solution.mixed(target, nums))
IO.inspect(Solution.find_sums(nums, 0, []))
IO.inspect(Solution.find_sums(nums, 0, []) |> Enum.frequencies())

nums = [1]
target = 1
# 1
IO.puts(Solution.find_target_sum_ways(nums, target))

nums = [0, 0, 0, 0, 0, 0, 0, 0, 1]
target = 1
# 256
IO.puts(Solution.find_target_sum_ways(nums, target))

prev2 = Time.utc_now()
prev = System.monotonic_time()
nums = Enum.to_list(1..50) |> Enum.map(fn _x -> Enum.random(1..1000) end)
target = Enum.random(1..1000)
# IO.puts(Solution.find_target_sum_ways(nums, target))
# IO.puts(Solution.dfs(target, nums, 0))
# IO.puts(Solution.dfs_with_memo(target, nums, 0, Map.new(), 0)[:count])
next = System.monotonic_time()
next2 = Time.utc_now()
diff = next - prev
diff2 = Time.diff(next2, prev2, :millisecond)
IO.puts("Time")
IO.puts(diff)
IO.puts(diff2)
